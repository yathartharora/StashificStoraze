import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

class RequestRow extends Component{

    render(){
        const {Row, Cell} = Table;
        return (
            <Row>
                <Cell>{this.props.request.name} </Cell>
                <Cell>{this.props.request.link} </Cell>
            </Row>
            
        );
    }
}


export default RequestRow;