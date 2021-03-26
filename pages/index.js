import React, {Component} from 'react';
import Layout from '../Components/Layout'
import HeadText from '../Components/Heading';
import {Grid, Button, Form, Input} from 'semantic-ui-react';
import drive from '../Ethereum/drive';
import web3 from '../Ethereum/web3';

class DDrive extends Component{

    state = {
        pass: '',
        loading: false,
    }

    onSubmit = async(event) => {
        event.preventDefault();
        this.setState({loading:true});
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            const key = '0x' + this.state.pass;
            await drive.methods.registerTodrive(key).send({
                from: accounts[0],
                gas: '1000000'
            })
        } catch (error) {
            
        }
        this.setState({loading: false});
    }
    
    render(){

        return(
            <Layout>
                <HeadText />
                <br></br>
                <Grid columns={2}>
                    <Grid.Column width={6} floated="left">

                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Password</label>
                            <Input
                             value = {this.state.pass}
                             onChange = {event => this.setState({pass: event.target.value})}
                            />
                        </Form.Field>
                        <Button primary loading={this.state.loading}>Register</Button>
                    </Form>
                    
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default DDrive;