import React, { Component} from 'react';
import '../App.css';


class Report extends Component {
  render() {
    return (
      <div className="Report">
          <div className="middle">
                <div className="circle"></div>
                <div className="content">
                    {this.props.children}
                </div>
          </div>
          <div className="middle">
                <div className="circle"></div>
                <div className="content">
                    {this.props.children}
                </div>
          </div>
          <div className="middle">
                <div className="circle"></div>
                <div className="content">
                    {this.props.children}
                </div>
          </div>
          
      </div>
    );
  }
  
}

export default Report;
