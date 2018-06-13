import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Card, CardTitle, CardText, Button, Row, Col } from "reactstrap";

export default class DashComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hoots: []
    };
  }

  loadHoots = () => {
    for (let i = 0; i < 8; i++) {
      this.setState({
        hoots: this.state.hoots.concat("lorem ipsum")
      });
    }
  };

  render() {
    const items = [];
    this.state.hoots.map((hoot, i) =>
      items.push(
        <Row key={i}>
          <Col xs="6">
            <Card
              body
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>{hoot}</CardText>
              <Button>Button</Button>
            </Card>
          </Col>
          <Col xs="6">
            <Card
              body
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>{hoot}</CardText>
              <Button>Button</Button>
            </Card>
          </Col>
        </Row>
      )
    );
    return (
      <InfiniteScroll pageStart={0} loadMore={this.loadHoots} hasMore={true}>
        {items}
      </InfiniteScroll>
    );
  }
}
