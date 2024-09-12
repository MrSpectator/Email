document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Create function to implement API's
  function displayEmails(emails) {
    emails.forEach(email => {
      // Create div element to display list of emails
      const emailItem = document.createElement('div');
      emailItem.classList.add('form-control');
      emailItem.style.display = 'flex';
      emailItem.style.flexDirection = 'row';
      emailItem.style.justifyContent = 'space-between';
      emailItem.style.alignItems = 'center';
      emailItem.innerHTML = `
      <span style="font-weight: bold;">${email.sender}</span>
      <span>${email.subject}</span>
      <span style="margin-left: 20px;">${email.timestamp}</span>
    `;
      document.querySelector('#emails-view').append(emailItem);
      // set emailItem to read onclick
      emailItem.onclick = function() {
        fetch(`emails/${email.id}`, {
          method: 'PUT', 
          body: JSON.stringify({
            read: true
          })
        })
        .then(response => response.json())
        .then(result => {
          
        })
        .catch(error => {
          console.log("Error", error)
        });
      }
      if (email.read) {
        emailItem.style.backgroundColor = 'lightgray';
      } else {
        emailItem.style.backgroundColor = 'white';
      }
      // create variables to display email details 
      const emailDetails = document.querySelector('#email');
      const emailBody = document.querySelector('#email-body');
      emailItem.addEventListener('click', function() {
        fetch(`emails/${email.id}`)
        .then(response => response.json())
        .then(email => {

          // show email and hide other views
          document.querySelector('#emails-view').style.display = 'none';
          document.querySelector('#compose-view').style.display = 'none';
          document.querySelector('#email').style.display = 'block';
          document.querySelector('#email-body').style.display = 'block';
          document.querySelector('#buttons').style.display = 'block';

          // show email details
          emailDetails.innerHTML = '';

          const send = document.createElement('p');
          send.textContent = `From: ${email.sender}`;
          emailDetails.append(send);

          const recip = document.createElement('p');
          recip.textContent = `To: ${email.recipients}`;
          emailDetails.append(recip);

          const subj = document.createElement('p');
          subj.textContent = `Subject: ${email.subject}`;
          emailDetails.append(subj);

          const date = document.createElement('p');
          date.textContent = `Timestamp: ${email.timestamp}`;
          emailDetails.append(date);
          
          // Conditional statement to Archive and Unarchive emails
          const butt = document.querySelector('#archived-button'); 
          
          if (email.archived) {
            butt.value = 'Unarchive';
            butt.onclick = function() {
              fetch(`emails/${email.id}`, {
                method: 'PUT', 
                body: JSON.stringify({
                  archived: false
                })
              })
              .then(response => response.json())
              .then(result => {
                load_mailbox('inbox');
              })
              .catch(error => {
                console.log("Error", error)
              });
            };
          } else {
            butt.value = 'Archive';
            butt.onclick = function() {
              fetch(`emails/${email.id}`, {
                method: 'PUT', 
                body: JSON.stringify({
                  archived: true
                })
              })
              .then(response => response.json())
              .then(result => {
                load_mailbox('archive');
              })
              .catch(error => {
                console.log("Error", error)
              });
            };
          }

          const repButt = document.querySelector('#reply-button');
          repButt.value = 'Reply';
          repButt.onclick = function(event) {
            event.preventDefault();
            compose_email()

            document.querySelector('#compose-recipients').value = `${email.sender}`;
            document.querySelector('#compose-subject').value = `RE: ${email.subject}`;
            document.querySelector('#compose-body').value = `On ${email.timestamp}, ${email.recipients} wrote: ${document.querySelector('#compose-body').value}`;
          };
          
          

          emailBody.innerHTML = '';

          const bod = document.createElement('p');
          bod.textContent = email.body;
          emailBody.append(bod);

          
        });
      });
    })
  };

  // By default, load the inbox

  load_mailbox('inbox');

  // Submit form
  document.querySelector('#compose-form').onsubmit = function(event) {
    event.preventDefault();
    load_mailbox('sent')
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
    })
    .catch(error => {
      console.log("Error", error);
    });
  };

  
  

  function load_mailbox(mailbox) {
  
    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email').style.display = 'none';
    document.querySelector('#email-body').style.display = 'none';
    document.querySelector('#buttons').style.display = 'none';
  
    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
    // Fetch and display emails for the selected mailbox
    fetch(`/emails/${mailbox}`)
      .then(response => response.json())
      .then(emails => {
        displayEmails(emails);
      })
      .catch(error => {
        console.log("Error", error);
      });
  }
  
  function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#buttons').style.display = 'none';
    document.querySelector('#email').style.display = 'none';
    document.querySelector('#email-body').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
  
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  }
});


