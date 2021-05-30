import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Blog from './containers/Blog/Blog';
import Projects from './containers/Projects/Projects';
import Aboutme from './components/Aboutme/Aboutme';

function App() {
    return (
        <div>
            <Layout>
                <Route path="/" exact component={Blog} />
                <Route path="/blog" component={Blog} />
                <Route path="/projects" component={Projects} />
                <Route path="/about-me" component={Aboutme} />
            </Layout>
        </div>
    );
}

export default App;
