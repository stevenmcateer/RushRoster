import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Cookie Functions
export function bake_cookie(response){
  console.log('Baking cookies...');
  cookies.set('username', response['username'], { expires: new Date(Date.now() + 3600), path: '/' });
  cookies.set('organization', response['organization'], { expires: new Date(Date.now() + 3600), path: '/' });
  cookies.set('permission', response['permission'], { expires: new Date(Date.now() + 3600),  path: '/' });
  cookies.set('isAuthenticated', response['isAuthenticated'], { expires: new Date(Date.now() + 3600),  path: '/' });
  console.log('Done!');
}

export function show_cookies(){
  console.log('------ Current Cookies ------');
  console.log('Username: ' + cookies.get('username'));
  console.log('Organization: ' + cookies.get('organization'));
  console.log('Permission Level: ' + cookies.get('permission'));
  console.log('isAuthenticated: ' + cookies.get('isAuthenticated'));
  console.log('-----------------------------');
}

export function eat_cookies(){
  console.log("Nom Nom Nom")
  cookies.remove('username');
  cookies.remove('organization');
  cookies.remove('permission');
  cookies.remove('isAuthenticated');
  console.log("Removed all cookies")
}
