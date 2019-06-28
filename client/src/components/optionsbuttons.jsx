import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/optionbuttons.css';

class OptionsButtons extends Component {
   render() {
      const { options } = this.props;

      return (
        <div className="optContainer">
           {
              options.map(o => {
                  return <Link key={o.link} to={o.link} className="optItem" >{o.label}</Link>
              })
           }
        </div>
      );
   }
}

export default OptionsButtons;