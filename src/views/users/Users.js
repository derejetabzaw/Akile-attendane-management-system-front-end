import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Col, Row, Tabs, Button } from "antd";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import usersData from "./UsersData";
import { v4 as uuid } from "uuid";
import Column from "antd/lib/table/Column";
import { Provider } from "react-redux";
// import { copyWithin } from "core-js/fn/array";

const { TabPane } = Tabs;

const itemsOfData = [
  { id: uuid(), content: "First" },
  { id: uuid(), content: "Second" },
];

const columnData = {
  [uuid()]: {
    name: "Employee",
    items: itemsOfData,
  },
  [uuid()]: {
    name: "Sites",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceCol = columns[source.droppableId];
    const destinartionCol = columns[source.droppableId];
    const sourceItems = [...sourceCol.items];
    const destiantionItems = [...destinartionCol.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destiantionItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destinartionCol,
        items: destiantionItems,
      },
    });
  } else {
    const col = columns[source.droppableId];
    const copiedItem = [...col.items];
    const [removed] = copiedItem.splice(source.index, 1);
    copiedItem.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...col,
        items: copiedItem,
      },
    });
  }
};

const Users = (props) => {
  useEffect(() => {
    console.log("props", props);
  });

  const [columns, setColumns] = useState(columnData);

  return (
    <>
      <Row>
        <Tabs tabPosition="left">
          {/* <Row>
                  <Col> */}
          <TabPane tab="Site 1" key="1">
            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100",
                }}
              >
                <DragDropContext
                  onDragEnd={(result) =>
                    // console.log("iiii", result)
                    onDragEnd(result, columns, setColumns)
                  }
                >
                  {Object.entries(columns).map(([id, column]) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <h3>{column.name} </h3>
                        <div style={{ margin: 20 }}>
                          <Droppable droppableId={id}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    background: snapshot.isDraggingOver
                                      ? "white"
                                      : "lightgray",
                                    padding: 4,
                                    width: 250,
                                    minHeight: 500,
                                  }}
                                >
                                  {column.items.map((item, index) => {
                                    return (
                                      <Draggable
                                        key={item.key}
                                        draggableId={item.id}
                                        index={index}
                                      >
                                        {(provided, snapshot) => {
                                          return (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                userSelect: "none",
                                                margin: "0 0 8px 0",
                                                padding: 16,
                                                minHeight: "50px",
                                                backgroundColor: snapshot.isDragging
                                                  ? "black"
                                                  : "brown",
                                                color: "white",
                                                ...provided.draggableProps
                                                  .style,
                                              }}
                                            >
                                              {item.content}
                                            </div>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                  })}
                                </div>
                              );
                            }}
                          </Droppable>
                        </div>
                      </div>
                    );
                  })}
                </DragDropContext>
              </div>
            </Col>
            <Col style={{ float: "right", marginLeft: "45%" }}>
              {" "}
              <Button ghost>Save</Button>
            </Col>
          </TabPane>
          {/* </Col>
                </Row> */}
        </Tabs>
      </Row>
    </>
  );
};

export default Users;
