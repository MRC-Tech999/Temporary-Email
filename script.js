const apiKey = 'k_Me8dOLP26G6y50KQjgqOu6KE2nHMzDW92Bvvlcg4c18'; // Remplace par ta clé API

// Fonction pour générer un email temporaire
async function getTemporaryEmail() {
    try {
        const response = await fetch('https://api.mailsac.com/v2/addresses', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        const tempEmail = data.address;

        // Afficher l'email temporaire
        document.getElementById('emailDisplay').innerHTML = `Your temporary email: <strong>${tempEmail}</strong>`;

        // Appeler la fonction pour afficher les messages
        getMessages(tempEmail);
    } catch (error) {
        console.error('Error generating temporary email:', error);
    }
}

// Fonction pour obtenir les messages dans la boîte de réception
async function getMessages(email) {
    try {
        const response = await fetch(`https://api.mailsac.com/v2/addresses/${email}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await response.json();

        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = ''; // Réinitialiser l'affichage des messages

        if (data.length === 0) {
            messagesContainer.innerHTML = '<p>No messages received yet.</p>';
        } else {
            data.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `
                    <strong>From:</strong> ${message.from[0].name} (${message.from[0].address}) <br>
                    <strong>To:</strong> ${message.to[0].name} (${message.to[0].address}) <br>
                    <strong>Subject:</strong> ${message.subject} <br>
                    <strong>Received at:</strong> ${new Date(message.received).toLocaleString()} <br>
                    <strong>Spam score:</strong> ${message.spam} <br>
                    <strong>Attachments:</strong> ${message.attachments.length > 0 ? message.attachments.join(', ') : 'No attachments'} <br>
                    <p><strong>Message Body:</strong><br>${message.body_text}</p>
                `;
                messagesContainer.appendChild(messageElement);
            });
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
    }
            
