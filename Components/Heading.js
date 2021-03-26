import React from 'react';
import { Header, Image, Icon, Segment } from 'semantic-ui-react';
import {Link} from '../routes';
import Head from 'next/head';

const square = { width: 175, height: 175 }

const HeaderExampleTextAlignment = () => (
    
  <Header as='h1' icon textAlign='center' dividing>
            <div style={{marginLeft: 300, marginBottom:10}}>
        <Segment circular style={square}>
            <Header as='h1'>
                THE
            </Header>
        </Segment>
        <Segment circular inverted style={square}>
            <Header as='h1'>
                DECENTRALISED
            </Header>
        </Segment>
        <Segment circular style={square}>
            <Header as='h1'>
                DRIVE
            </Header>
        </Segment>
        </div>
        <Header.Subheader>
            "Enjoy Unlimited Storage"
        </Header.Subheader>
    </Header>
)

export default HeaderExampleTextAlignment