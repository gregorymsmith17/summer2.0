import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';
import { Row, Col, Tabs, Table, Divider, Tag, message, Card, Drawer, Menu, Dropdown, Button, Layout, Carousel, Input, Popover, Icon, Cascader, Switch, Select, AutoComplete, Radio } from 'antd';

class App extends Component {

	render() {


		const listOne = [
			{ id: 1, text: "Item 1" },
			{ id: 2, text: "Item 2" },
			{ id: 3, text: "Item 3" },
			{ id: 4, text: "Item 4" },
			{ id: 5, text: "Item 5" },
		];

		const listTwo = [
			{ id: 4, text: "Item 4" },
			{ id: 5, text: "Item 5" },
			{ id: 6, text: "Item 6" }
		];

		const listThree = [
			{ id: 7, text: "Item 7" },
			{ id: 8, text: "Item 8" },
			{ id: 9, text: "Item 9" },
      { id: 10, text: "Item 7" },
			{ id: 11, text: "Item 8" },
			{ id: 12, text: "Item 9" },
      { id: 13, text: "Item 7" },
			{ id: 14, text: "Item 8" },
			{ id: 15, text: "Item 9" },
      { id: 16, text: "Item 7" },
			{ id: 17, text: "Item 8" },
			{ id: 18, text: "Item 9" }
		];

		return (
			<div >
      <Row>
				<Container id={1} list={listOne} />
				</Row>
			</div>
		);
	}
}
const Drop = DragDropContext(HTML5Backend)(App);
export default Drop;
