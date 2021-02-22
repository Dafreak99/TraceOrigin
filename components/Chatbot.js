const Chatbot = () => {
  return (
    <div className="vl">
      <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      <df-messenger
        chat-icon="./chat.svg"
        intent="WELCOME"
        chat-title="TraceOrigin"
        agent-id="295d97bd-170e-4663-b375-aeae250a1c2a"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Chatbot;
