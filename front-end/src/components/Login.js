import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';
import { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from 'react-router-dom';

import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json';
Amplify.configure(config);

async function isLoggedIn() {
    try {
        const res = await getCurrentUser();
        return true;
    } catch (error) {
        // console.log('Error:', error);
        return false;
    }
}
async function tokens() {
    try {

        const session = await fetchAuthSession();
        console.log('session', session);
        console.log('access token:', session.tokens.accessToken.toString());        
        console.log('id token:', session.tokens.idToken.toString());        
    }
    catch (err) {
        console.log('err',err);
    }
    
}
async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
    // console.log(await getCurrentUser());
  } catch (err) {
    console.log("err", err);
  }
}


function Login() {
    
    const navigate = useNavigate();
    const { authStatus } = useAuthenticator(context => [context.authStatus]);    // console.log('loggedIn? ', isLoggedIn());
    
    useEffect(() => {
        if (authStatus === 'authenticated') {
            navigate('/'); // Redirect to the homepage
        }

    }, [authStatus, navigate]);

    return (
        <div>
            <Authenticator>
            </Authenticator>
        </div>
    );
}

export default Login;
export {isLoggedIn, handleSignOut};