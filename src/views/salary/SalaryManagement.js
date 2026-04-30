import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import PayrollRecords from "../theme/typography/Typography";
import AllowanceAdvance from "../theme/colors/Colors";
import OvertimeManagement from "../theme/overtime/Overtime";

const SalaryManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            <h4 className="mb-0">Salary Management</h4>
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={activeTab} onActiveTabChange={(idx) => setActiveTab(idx)}>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-file" className="mr-2" />
                    Payroll Records
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-credit-card" className="mr-2" />
                    Allowance / Advance
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" className="mr-2" />
                    OT Management
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent className="pt-4">
                <CTabPane>
                  {activeTab === 0 && <PayrollRecords />}
                </CTabPane>
                <CTabPane>
                  {activeTab === 1 && <AllowanceAdvance />}
                </CTabPane>
                <CTabPane>
                  {activeTab === 2 && <OvertimeManagement />}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SalaryManagement;
