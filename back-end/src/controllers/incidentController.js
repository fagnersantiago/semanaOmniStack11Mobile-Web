
const conntection =  require('../database/connection');

module.exports = {

    async index(request, response){

        const {page = 1 } = request.query;

        const [count] = await conntection('incidents').count();
 
        const incidents = await conntection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id' )
        .limit(8)
        .offset((page - 1) * 8)
        .select(
         ['incidents.*',
         'ongs.name',
         'ongs.email',
         'ongs.whatsapp',
         'ongs.city',
         'ongs.uf']);

       response.header('X-Total-Count', count ['count(*)'])

        return response.json(incidents);
    },
    
    
    async create(request, response){

        const {title, descriptions,value} = request.body;

       const ong_id = request.headers.authorization;

       const [id] = await conntection ('incidents').insert({

            title,
            descriptions,
            value,
            ong_id,
        });

        return response.json({id})

    },

    async delete(request, response){

        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await conntection('incidents')
        .where('id', id)
        .select('ong_id')
        .first()   
        
        if(incident.ong_id !== ong_id){

            return response.status(204).json({error: 'Operation denied.'});
        }

        await conntection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
};