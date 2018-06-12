import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Card, CardTitle, CardText, Button } from "reactstrap";

export default class DashComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hoots: []
    };
  }

  loadHoots = () => {
      for (let i = 0; i < 8; i++) {
        this.state.hoots.push('lorem ipsum')
      }
  };

  render() {
    const items = [];
    this.state.hoots.map((hoot, i) => {
      items.push(
        <Card
          body
          inverse
          style={{ backgroundColor: "#333", borderColor: "#333" }}
          key={i}
        >
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>
            {hoot}
          </CardText>
          <Button>Button</Button>
        </Card>
      );
    });
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadHoots}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {items}
      </InfiniteScroll>
    );
  }
}
