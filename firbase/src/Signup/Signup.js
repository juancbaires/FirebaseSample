import React, { Component } from 'react';

class Signup extends Component {
    render() {
        return (
            <div className="signup">
                <h2>Signup</h2>
                <form>
                    <label>Email</label>
                    <input type="text" placeholder="Email"></input>
                    <label>Password</label>
                    <input type="text" placeholder="password"></input>
                </form>

            </div>
        );
    }
}

export default Signup;