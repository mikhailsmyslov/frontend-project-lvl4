import React, {
  useRef, useEffect, useState, useContext,
} from 'react';
import { connect } from 'react-redux';
import { Toast, Button } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import { getCurrentChannelMessages } from '../selectors';
import UserContext from '../UserContext';

const ScrollToBottomButton = (props) => {
  const { onClick } = props;
  return (
    <Button
      variant="info"
      className="position-sticky align-self-end d-flex justify-content-center align-items-center shadow-sm text-white"
      style={{
        width: '35px', height: '35px', bottom: '20px', right: '20px', opacity: '0.5', borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronDown} size="lg" />
    </Button>
  );
};

const Message = (props) => {
  const { text, author, date } = props;
  const { currentUser } = useContext(UserContext);
  const isCurrentUserMessage = author === currentUser;
  const messageClasses = classnames({
    'w-75 my-3 mx-5': true,
    'align-self-end': isCurrentUserMessage,
    'align-self-start': !isCurrentUserMessage,
  });
  return (
    <div className={messageClasses}>
      <Toast className="mw-100">
        <Toast.Header closeButton={false}>
          <Avatar name={author} round size={25} textSizeRatio={1} className="mr-2" />
          <strong className="mr-auto">{author}</strong>
          <small><Trans i18nKey="formatDate">{{ date }}</Trans></small>
        </Toast.Header>
        <Toast.Body dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      </Toast>
    </div>
  );
};

const Main = (props) => {
  const { className, messages } = props;
  const mainClasses = classnames({ 'd-flex flex-column position-relative': true }, className);

  const mainRef = useRef();
  const [scrollStatus, setScrollStatus] = useState('initial');
  const [isScrollButtonVisible, setScrollButtonVisibility] = useState(false);


  const scrollMainToBottom = (behavior) => {
    const main = mainRef.current;
    main.scroll({ top: main.scrollHeight, behavior });
  };

  useEffect(() => {
    if (scrollStatus === 'scrolling') return;
    const behavior = scrollStatus === 'initial' ? 'auto' : 'smooth';
    scrollMainToBottom(behavior);
  });

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = mainRef.current;
    const offsetFromBottom = Math.trunc(scrollHeight - scrollTop - clientHeight);
    const hasReachedBottom = offsetFromBottom === 0;
    const shouldShowScrollButton = offsetFromBottom > 100;
    setScrollButtonVisibility(shouldShowScrollButton);
    setScrollStatus(hasReachedBottom ? 'bottom' : 'scrolling');
  };

  const debouncedHandleScroll = debounce(handleScroll, 100, { leading: true });

  return (
    <main ref={mainRef} className={mainClasses} onScroll={debouncedHandleScroll}>
      {messages.map(({
        text, author, date, id,
      }) => <Message key={id} text={text} author={author} date={date} />)}
      {isScrollButtonVisible && <ScrollToBottomButton onClick={() => scrollMainToBottom('smooth')} />}
    </main>
  );
};

const mapStateToProps = (state) => ({
  messages: getCurrentChannelMessages(state),
});

export default connect(mapStateToProps)(Main);
