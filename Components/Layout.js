import React from 'react';;
import Head from 'next/head';
import { Container, Header} from 'semantic-ui-react';

export default (props) => {
    return (

        <Container>
            <Head>
            <link async rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.2.12/dist/semantic.min.css" />
            </Head>
            <Header />
            {props.children}
        </Container>
    );
};