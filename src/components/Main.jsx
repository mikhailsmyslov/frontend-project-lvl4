import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import classnames from 'classnames';
import { Trans } from 'react-i18next';
import { getCurrentChannelMessages } from '../selectors';
import UserContext from '../UserContext';

const renderMessage = (message, currentUser) => {
  const { text, author, date } = message;
  const isCurrentUserMessage = author === currentUser;
  const classes = classnames({
    'w-75': true,
    'my-3': true,
    'mx-5': true,
    'align-self-end': isCurrentUserMessage,
    'align-self-start': isCurrentUserMessage,
  });
  return (
    <div className={classes}>
      <Toast className="mw-100">
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">{author}</strong>
          <small>
            <Trans i18nKey="formatDate">{{ date }}</Trans>
          </small>
        </Toast.Header>
        <Toast.Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      </Toast>
    </div>
  );
};

const Main = (props) => {
  const { className, messages } = props;
  const classes = classnames({
    'd-flex': true,
    'flex-column': true,
  }, className);
  return (
    <UserContext.Consumer>
      {({ currentUser }) => (
        <main className={classes}>
          {messages.map((message) => (
            <Fragment key={message.id}>{renderMessage(message, currentUser)}</Fragment>))}
        </main>
      )}
    </UserContext.Consumer>
  );
};

const mapStateToProps = (state) => ({
  messages: getCurrentChannelMessages(state),
});

export default connect(mapStateToProps)(Main);
