## Local Setup
***Make sure you have a .env.local file in BOTH the /frontend and /backend directories for local config settings***

* After running the **Basic Setup** below:
* You'll need to retrieve an api key from https://developer.wmata.com/.
* Add the following to your .env.local file in backend/
	* ` API_KEY=your-api-key-from-wmata `
* Add  the following to your .env.local file in the /frontend
    * ` VITE_API_BASE_URL='http://localhost:8000/api' `
* Add the following service to /backend/config/services.yaml
   ``` 
       # add more service definitions when explicit configuration is needed
       # please note that last definitions always *replace* previous ones
       App\Service\WMATAService:
         arguments:
            $ApiKey: '%env(API_KEY)%'
            $client: '@http_client'

## Basic Setup
This is the basic setup for the Vue3 interface backed by a Symfony REST API.

To setup your local instance, run `./setup.sh`. This command will build the local docker images, install php and npm dependencies, and start the containers.

After that, you should be able to navigate to localhost:3000 and see changes you make live. The API will be available at localhost:8000.

The Symfony based PHP code can be found in `/backend`:
- Symfony Documentation: https://symfony.com/doc/current/index.html
- An example REST Controller can be found in `backend/src/Controller/HelloWorldController.php`

The Vue3 code can be found in `/frontend`:
- Vue3 Documentation: https://vuejs.org/guide/introduction.html
- An example Component can be found in `frontend/src/components/HelloWorld.vue`
- The Component uses `axios` to call the REST Controller defined in Symfony

