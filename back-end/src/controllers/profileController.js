
const conntection =  require('../database/connection');

module.exports = {

 async index(request, response){

    const ong_id = request.headers.authorization;
    
    const incident = await conntection('incidents')
     .where('ong_id', ong_id)
     .select('*')

     return response.json(incident)
 }

}