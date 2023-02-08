import { Component } from "react";
import error from '../../images/error.gif'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }
    static getDerivedStateFromError(error) {
        return {error: true}
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return (
                <>
                    <h1>404</h1>
                    <img src={error} alt="error" />
                </>
            )
        }
        return this.props.children;

    }
}

export default ErrorBoundary;