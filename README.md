# Orbit Webhook Simulator powered by RedwoodJS

Demonstrate [Orbit](https://www.orbit.love) and [RedwoodJS](https://www.redwoodjs.com) Webhook API integration.

### Flow
![](docs/diagrams/orbit-simulator-flow.png)

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

#### Supabase

```
supabase init
```

* Set Postgres to 6432
* Set port to 7910 as use as `SUPABASE_URL`

For Environment Variables, make note of:

``` terminal
# Supabase URL: http://localhost:7910
# Supabase Key (anon, public):
# Supabase Key (service_role, private):
# Database URL: postgres://postgres:postgres@localhost:6432/postgres
#
```

and

* Set SupabaseURL as `SUPABASE_URL`
* Set Supabase Key (anon, public) as `SUPABASE_KEY`
* Set Supabase Key (service_role, private) as `SUPABASE_PRIVATE_KEY`
* Set Database URL as `DATABASE_URL`
* Set auth GOTRUE_JWT_SECRET in `docker-compose.yml` and use as `SUPABASE_JWT_SECRET`

```
  auth:
    container_name: supabase-auth
    image: supabase/gotrue:latest
    environment:
      GOTRUE_JWT_SECRET: some secret
```


#### Ngrok Tunnelling

`ngrok http --host-header=rewrite  --subdomain=your-subdomain 8910`

To receive incoming webhooks on just api side:

`ngrok http --host-header=rewrite  --subdomain=your-subdomain 8911`

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.

