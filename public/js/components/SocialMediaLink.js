import React from 'react';

export default class SocialMediaLink extends React.Component {

  constructor(props) {
    super(props);
  }

  static getLinkDomain(url) {
    let a = document.createElement('a');
    a.href = url;
    // cut the prefix 'www.' and the last '.' with suffix (e.g.: www.github.com -> github)
    return a.hostname.replace(/(www.)?(.+)\.[A-Za-z0-9\.]+/i, '$2');
  }

  render() {
    let domain = SocialMediaLink.getLinkDomain(this.props.link).toLowerCase();
    return (
      <span className={'social-icon ' + domain}>
        <i className={'fa fa-' + domain}></i>
      </span>
    );
  }

}