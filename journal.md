# Dicember
## 3
Setup, Created the front's Empty app, The back's proyect.
I will use MariaDB and Waterline-Mysql for ORM.
Bcrypt and UUID for security.
NGINX for reverse proxy.
After the project is done i will se if I include a Dnsmasq for CA.

The project:
The project is a simple blog platform ala Tumblr and Twitter.
The users { UUID, Name, Username, Password, Email, Credentials} Will write blogposts {INCREMENTAL ID, Title, Content }, and these will have a list of Comments {BLOG ID, UUID, Maker ID, Comment[256]}
Credentials{
  Anon: Only read Posts,
  User: Write & Read Post,
  Admin: GRUB POSTS and USERS,
}

Scaffolding Angular APP.
Services: Auth (& User services), Blog, Comment
Components: Layout, Front, Landing, User Settings, Blog Form, Blog Post.
Layout: TOP BAR
        -------
        Rest
TOP BAR = |App Name| Post Name | --> | Username {Login/Settings, Register/Logout}

Rest = { Front | Blog Form | Blog View }

Front = Latest 5 Blogs
Blog Form = Blog Form
Blog View = BLOG
            COMMENT FORM
            COMMENTS

BLOG = TITLE
       by Username
       BODY
       Usarname

Blog Form = Title
            Body = MD

COMMENT = @Blog TItle
          by Username
          BODY = [256]

post v1 objective Login Modal

# 4
Basic models and ORM setup done.
Working on API
*Sigh* will use Loopback framework.

Go Back to work on the front
post v1 objective Login Modal

# 11 
went back to work. The basic forms for the auth are ready.
Working in syncing the lb backend to the angular app

# 12 
Token injector working. Need to fix the register form. it doen't seems to end and doesn't get cleared.
working on other forms

# 13
Finished basic features :D.
I need to work on the registry and email thingys. Test inputs and make the security testing today night, for tomorrow morning.
I need to create the installing script.

Priority Features Done. C:!
I need to fix the max with of the md images, but that is for latter.

Some know bugs:
  - No feedback on errors
  - One of the boot scripts must be remove after the first season otherwise it deletes all the tables.
  - Can't edit things.

These are features for other time!

Find new bug:
  - Text is not wrapped around in the comments.
