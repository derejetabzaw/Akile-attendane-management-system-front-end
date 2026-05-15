import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CAlert
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const base_url = "http://localhost:9000/api/v1";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f46e5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const PayrollRecords = () => {
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPayroll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${base_url}/payroll/calculate?month=${month}`, {
        headers: { authorization: localStorage.getItem("Bearer") },
      });
      setPayrollData(response.data.payroll || []);
    } catch (err) {
      setError("Failed to fetch payroll. Ensure month records are approved.");
      setPayrollData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayroll();
  }, [month]);

  const generatePDF = () => {
    if (payrollData.length === 0) return;
    const doc = new jsPDF("landscape");
    doc.setFontSize(18);
    doc.text(`Monthly Payroll Report - ${month}`, 14, 22);

    const tableColumn = ["Staff ID", "Name", "Base Salary", "Work Hrs", "OT1 Pay", "OT2 Pay", "Net Pay"];
    const tableRows = payrollData.map((p) => [
      p.staffId,
      p.name,
      p.baseSalary,
      p.totalWorkHours,
      p.ot1Pay,
      p.ot2Pay,
      p.totalNetPay,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: "grid",
    });

    doc.save(`Payroll_${month}.pdf`);
  };

  return (
    <div>
      <CRow className="mb-4 align-items-end">
        <CCol md="4">
          <CFormGroup className="mb-0">
            <CLabel htmlFor="month">Select Month</CLabel>
            <CInput
              type="month"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </CFormGroup>
        </CCol>
        <CCol className="text-right">
          <CButton color="success" onClick={generatePDF} disabled={payrollData.length === 0}>
            <CIcon name="cil-save" className="mr-2" /> Export PDF
          </CButton>
        </CCol>
      </CRow>

      {error && <CAlert color="warning">{error}</CAlert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Staff ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Base Salary</StyledTableCell>
              <StyledTableCell>Work Hrs</StyledTableCell>
              <StyledTableCell>OT1 Pay</StyledTableCell>
              <StyledTableCell>OT2 Pay</StyledTableCell>
              <StyledTableCell>Net Pay</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading payroll data...</TableCell>
              </TableRow>
            ) : payrollData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No approved records found for this month.</TableCell>
              </TableRow>
            ) : (
              payrollData.map((p) => (
                <StyledTableRow key={p.userId}>
                  <StyledTableCell>{p.staffId}</StyledTableCell>
                  <StyledTableCell>{p.name}</StyledTableCell>
                  <StyledTableCell>{p.baseSalary}</StyledTableCell>
                  <StyledTableCell>{p.totalWorkHours}</StyledTableCell>
                  <StyledTableCell className="text-success">+{p.ot1Pay}</StyledTableCell>
                  <StyledTableCell className="text-success">+{p.ot2Pay}</StyledTableCell>
                  <StyledTableCell className="font-weight-bold">{p.totalNetPay}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PayrollRecords;
