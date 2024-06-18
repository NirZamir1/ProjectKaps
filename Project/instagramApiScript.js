function authenticate()
{
    const clientId = '449606017712221';
    const redirectUri = 'https://localhost/Project/callback.html'; // Change to your actual redirect URI
    const scope = encodeURIComponent('user_profile,user_media');
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    window.location.href = authUrl;
}