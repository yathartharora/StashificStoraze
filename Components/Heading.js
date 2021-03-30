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
                STASHIFIC
            </Header>
        </Segment>
        <Segment circular style={square}>
            <Header as='h1'>
                STORAZE
            </Header>
        </Segment>
        </div>
        <Header.Subheader>
            "Delivering Unlimited Storage at your doorstep"
        </Header.Subheader>
    </Header>
)

export default HeaderExampleTextAlignment