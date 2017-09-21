import config from './ignore/config';
const URI = "https://directline.botframework.com/v3/directline/conversations/";

const headers = {
  'Authorization': config.directLine.key,
  'Content-Type': 'application/json'
}

const getBody = (text) => {
  return JSON.stringify({
    'type': 'message',
    text,
    'from': {
      'id': 'peggy',
      'name': 'peggy'
    },
    'channelData': {
      'clientActivityId': '1504855379922.8749398258414074.0'
    },
  });
}

function talk(text) {
  return fetch(
    URI,
    {
      method: 'POST',
      headers
    }
  ).then(res => res.json())
  .then(response => response.conversationId)
  .then(id => {
    fetch(
      URI+id+'/activities',
      {
        method: 'POST',
        headers,
        body: getBody('GINA, Send Message to C1'),
      }
    )
    .then(
      res => {
        fetch(
          URI+id+'/activities',
          {
            method: 'POST',
            headers,
            body: getBody(text),
          }
        )
      }
    )
  });
}

export default talk;
