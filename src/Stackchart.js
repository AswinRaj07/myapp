import React, { useState, useEffect } from "react";
import "./Design.css";
import { Column } from "@ant-design/plots";
import { Button, Select } from "antd";
import { Flex, Col, Row, Card } from "antd";
import datas from "./Data.json";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Stackchart() {
  const [data, setData] = useState(datas.count);
  const [yField, setYField] = useState("count");
  const [dateRange, setDateRange] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setYField(value);
    setData(datas[value]);
  };

  const handleDateChange = (dates) => {
    console.log("Selected Date Range:", dates);
    setDateRange(dates);
    filterDataByDateRange();
  };

  const filterDataByDateRange = () => {
    if (dateRange?.length === 2) {
      const filteredData = datas[yField].filter(
        (item) =>
          item.date >= dateRange[0].format("YYYY-MM-DD") &&
          item.date <= dateRange[1].format("YYYY-MM-DD")
      );
      setData(filteredData);

      const total = filteredData.reduce((a, item) => a + item[yField], 0);
      setTotalValue(total);
    }
  };

  const handleFilterClick = () => {
    filterDataByDateRange();
  };

  const items = [
    {
      key: "count",
      label: (
        <a target="_blank" rel="">
          Count
        </a>
      ),
    },
    {
      key: "cost",
      label: (
        <a target="_blank" rel="">
          Cost
        </a>
      ),
    },
  ];

  const config = {
    data,
    isStack: false,
    xField: "date",
    yField,
    seriesField: "productCode",
  };

  return (
    <div className="maindiv">
      <div className="topdiv">
        <Row>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Space direction="vertical" size={12}>
              <RangePicker onChange={handleDateChange} />
            </Space>
          </Col>
          <Col>
            <Select
              className="selectstyl"
              defaultValue="count"
              style={{ width: 200 }}
              onChange={handleChange}
              options={items.map((item) => ({
                label: item.label,
                value: item.key,
              }))}
            />
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Flex gap="small" wrap="wrap">
              <Button type="primary btnstyle" onClick={handleFilterClick}>
                Filter
              </Button>
            </Flex>
          </Col>
        </Row>
      </div>
      <div className="totaldiv">
        <Card style={{ width: 180 }}>
          <p>{`Total ${yField} : ${totalValue}`}</p>
        </Card>
      </div>
      <div className="chartdiv">
        <Column {...config} />
      </div>
    </div>
  );
}

export default Stackchart;
