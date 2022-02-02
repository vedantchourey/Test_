module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: "strapi-provider-upload-supabase",
            providerOptions: {
                apiUrl: process.env.SUPABASE_API_URL,
                apiKey: process.env.SUPABASE_API_KEY,
                bucket: process.env.SUPABASE_BUCKET
            }
        }
    }
})