import React, {Component} from 'react';
import Layout from '../Components/Layout'
import HeadText from '../Components/Heading';
import {Grid, Button, Form, Input, Message, Table, Icon} from 'semantic-ui-react';
import drive from '../Ethereum/drive';
import web3 from '../Ethereum/web3';
import ipfs from '../ipfs'
import {Link} from '../routes';

class DDrive extends Component{

    constructor(){
        super();
        this.state={
            displayoutput:[],    
            pass: '',
            loading: false,
            name: '',
            buffer: null,
            load: false,
            link: '',
            ipfsHash: '',
            active: 'False',
            sender: '',
            passcode: '',
            count: 0,
            format: '',
            currentDateTime: Date().toLocaleString()
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
            await drive.methods.upload(this.state.name, key, this.state.currentDateTime,this.state.format).send({
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
        this.setState({count: 0})
        try {
            const output = await drive.methods.display(this.state.sender,'0x'+ this.state.passcode).call()
            console.log(output);
            this.setState({displayoutput:output})
            console.log("display output"+ this.state.displayoutput)
            
            const requestCount = output.length;
            this.setState({count: requestCount});
        } catch (error) {
            
        }
        
    }


    render(){

        const {Header, Row, HeaderCell, Body, Cell} = Table;
        return(
            <Layout>
                <HeadText />
                <br></br>
                <Message>
                    <div style={{fontSize: 30, fontWeight:'bolder'}}>
                    About
                    </div>
                    <br></br>
                    <div style={{fontSize: 22}}>
                    <p>Delivering unlimited storage with complete privacy at your doorstep. Setup your MetaMask and get started now! DM's are always open for suggestions and reviews </p>
                    </div>
                    
                </Message>
                <Grid columns={3} divided padded stretched>
                    <Grid.Column>
                    <div style={{fontSize: 30, fontWeight:'bolder'}}>
                        Register
                    </div>
                    <Message> 
                    
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label>Passcode</label>
                            <Input
                             placeholder = "Should be 8 characters long. Use only hexadecimal characters"
                             value = {this.state.pass}
                             onChange = {event => this.setState({pass: event.target.value})}
                            />
                        </Form.Field>
                        <Button primary loading={this.state.loading} secondary>Register</Button>
                    </Form>
                    <br></br>
                    <Message attached='bottom' warning>
                    <Icon name='help' />
                    Already registered? Start uploading
                    </Message>

                    </Message>
                    <div style={{fontSize: 30, fontWeight:'bolder'}}>
                        My Files
                    </div>
                        <Message  size="huge">
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
                                <Button secondary>Display</Button>
                            </Form>
                        </Message>
                    
                    </Grid.Column>

                    <Grid.Column >
                    <div style={{fontSize: 30, fontWeight:'bolder'}}>
                        Upload
                    </div>
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

                                    <label>File Format</label>
                                    <Input
                                     value = {this.state.format}
                                     onChange = {event => this.setState({format: event.target.value})} 
                                    />
                                </Form.Field>
                                <Button onClick={this.generate} secondary>Upload</Button>
                                <br></br>
                                 <p>Uploaded Hash: {this.state.ipfsHash}</p>
                                <br></br>
                                <Button secondary loading={this.state.load}>Confirm Transaction</Button>
                            </Form>
                        </Message>

                    </Grid.Column>

                   
                    <Grid.Column>
                    <div style={{fontSize: 30, fontWeight:'bolder'}}>
                        Updates
                    </div> 
                    <Message>
                        <div style={{fontSize: 20}}>
                        <Message.List>
                            <Message.Item>You can access Stashific only via chrome browser and after setting up your MetaMask</Message.Item>
                            <Message.Item>MetaMask is an extension and pretty easy to set. Follow this <a href="https://youtu.be/yWfZnjkhhhg">tutorial</a> to setup your metamask.</Message.Item>
                            <Message.Item>You will be able to download Stashific and upload your files soon via a Mobile App.</Message.Item>
                            <Message.Item>Mobile App is currently in the development phase</Message.Item>
                            <Message.Item>In the upcoming update, you will be able to share your files just like you do in Google Drive.</Message.Item>
                        </Message.List>
                        </div>
                    </Message>
                        <Message>
                        <Message.Header>In case of queries/suggestions write to me at:</Message.Header>
                                <br></br>
                                <a href={`https://twitter.com/YatharthArora8`}><Icon name="twitter" size="huge" /></a>
                                <a><Icon name="mail" size="huge" /></a>
                                <a href={`https://github.com/yathartharora`}><Icon name="github" size="huge" /></a>
                                <a href={`https://www.linkedin.com/in/yathartharora/`}><Icon name="linkedin" size="huge" /></a>
                        </Message>
                    </Grid.Column>
                </Grid>

                <Message size="huge">
                    <div style={{fontSize: 30, fontWeight:'bolder'}}>
                        Files
                    </div>
                    <Table celled>
                        <Header>
                            <Row>
                                <HeaderCell>Name of the File</HeaderCell>
                                <HeaderCell>Link</HeaderCell>
                                <HeaderCell>Date Modified</HeaderCell>
                                <HeaderCell>File Format</HeaderCell>
                            </Row>
                        </Header>
                        <Body>
                        {this.state.displayoutput.map((d) => (
                            <Row>
                              <Cell>{d[0]}</Cell>
                              <Cell><a href={d[1]}>Click here</a></Cell>
                              <Cell>{d[2]}</Cell>
                              <Cell>{d[3]}</Cell>
                            </Row>
                        ))}
                        </Body>
                    </Table>
                </Message> 
            </Layout>
        )}
    }

    export default DDrive;