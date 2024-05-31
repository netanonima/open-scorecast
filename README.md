# open-scorecast
opensource sport forecast game manager

## Backend

### Launch the app
For development
```bash
cd open-scorecast-backend
npm run start:dev
```
For production
```bash
npm run build
cd dist
node main.js
```

## Frontend

### Launch the app
For development
```bash
cd open-scorecast-frontend
ng serve
```
For production
```bash
ng build --prod --localize
```

## Set Up Google OAuth2 Credentials:

- Go to the Google Cloud Console.
- Create a new project or select an existing one.
- Navigate to "APIs & Services" > "Credentials".
- Create OAuth 2.0 Client IDs for Web application.
- Set the authorized redirect URIs to your backend endpoint, e.g., http://localhost:3000/auth/google/callback.
- Then, with the client id and secret id provided, fill the corresponding fields in the `.env`
```bash
GOOGLE_CLIENT_ID=""
GOOGLE_SECRET_ID=""
```
