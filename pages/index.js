import React, {Component} from 'react';
import Layout from '../Components/Layout'
import HeadText from '../Components/Heading';
import {Grid, Button, Form, Input, Message} from 'semantic-ui-react';
import drive from '../Ethereum/drive';
import web3 from '../Ethereum/web3';
import ipfs from '../ipfs'

class DDrive extends Component{

    constructor(){
        super();
        this.state={
            pass: '',
            loading: false,
            name: '',
            buffer: null,
            load: false,
            link: '',
            ipfsHash: '',
            active: 'False',
            sender: '',
            passcode: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.captureFile = this.captureFile.bind(this);
        this.generate = this.generate.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.display = this.display.bind(this);
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

    onsubmit = async(event) => {
        event.preventDefault();
        this.setState({load: true});
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            const key = 'https://ipfs.io/ipfs/' + this.state.ipfsHash;
            await drive.methods.upload(this.state.name, key).send({
                from: accounts[0],
                gas: '1000000'
            })
        } catch (error) {
            
        }
        this.setState({load: false});
        this.setState({active:'False'});
    }
    

    generate(event) {
        event.preventDefault();
        this.setState({active:'False'});
        ipfs.files.add(this.state.buffer, (err, res) => {
            if(err){
                console.log(err)
                return
            }
            this.setState({ipfsHash: res[0].hash})
            console.log('ipfsHash: ', this.state.ipfsHash);
        })
        this.setState({active: 'True'});
    }

    captureFile(event) {
        event.preventDefault();
        console.log('Capture File...')

        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)})
            console.log('buffer ',this.state.buffer);
        }
    }

    display = async(event) => {
        event.preventDefault();
        try {
            const output = await drive.methods.display(this.state.sender,this.state.passcode).call()
            console.log(output[0]);
            const requestCount = output.length;
        } catch (error) {
            
        }
    }

    render(){

        return(
            <Layout>
                <HeadText />
                <br></br>
                <Grid columns={2}>
                    <Grid.Column width={6} floated="left">

                    <h4>Register To Start Uploading Files</h4>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Passcode</label>
                            <Input
                             placeholder = "Should be 8 characters long. Use only hexadecimal characters"
                             value = {this.state.pass}
                             onChange = {event => this.setState({pass: event.target.value})}
                            />
                        </Form.Field>
                        <Button primary loading={this.state.loading}>Register</Button>
                    </Form>

                    <Message 
                         size="huge"
                         icon="file"
                         header="My Files"
                        />
                        <Message>
                            <Form onSubmit={this.display}>
                                <Form.Field>
                                <label><Message.Header>Address</Message.Header></label>
                                    <Input 
                                     value = {this.state.sender}
                                     onChange = {event => this.setState({sender: event.target.value})}
                                    />
                                    <label><Message.Header>Passcode</Message.Header></label>
                                    <Input 
                                     value = {this.state.passcode}
                                     onChange = {event => this.setState({passcode: event.target.value})}
                                    />
                                </Form.Field>
                                <Button>Display</Button>
                            </Form>
                        </Message>
                    
                    </Grid.Column>

                    <Grid.Column widescreen={6}>
                        <Message 
                         header="Upload To Drive" 
                         icon="inbox"
                         size="huge"
                        />
                        <Message size="huge">
                            <Form onSubmit={this.onsubmit}>
                                <Form.Field>
                                    <label><Message.Header>File Name</Message.Header></label>
                                    <Input
                                     value = {this.state.name}
                                     onChange = {event => this.setState({name: event.target.value})}
                                    />

                                    <label><Message.Header>Attach File</Message.Header></label>
                                    <Input
                                     type = 'file'
                                     onChange = {this.captureFile}
                                    />
                                </Form.Field>
                                <Button onClick={this.generate}>Upload</Button>
                                <br></br>
                                 <p>Uploaded Hash: {this.state.ipfsHash}</p>
                                <br></br>
                                <Button secondary loading={this.state.load}>Confirm Transaction</Button>
                            </Form>
                        </Message>

                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default DDrive;