<Col xs={3} sm={5} md={5} lg={5} xl={5} style={{textAlign: 'right'}}>
  <Popover placement="bottom"  content={content} trigger="click">
<Button style={buttonStyle}><b>+ New</b></Button>
</Popover>

</Col>


const content = (
  <div>
    <Row>
            <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.65)'}} to="/monthlySamples">Add Sample</Link>
            </Row>

            <Row>

              <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.65)'}} to="/maintenanceReports">Add Maintenance Report</Link>
              </Row>
              </div>


);
