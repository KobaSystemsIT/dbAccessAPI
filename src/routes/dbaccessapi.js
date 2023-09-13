const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { getInventory, deleteProductInventory, addOrUpdateInventory } = require('../models/inventory/inventory');
const { viewDataClientsOrStaff } = require('../models/clients/clients');
const { getClubesData, crudClub } = require('../models/clubes/club');
const { newUserOrStaff, modifyOrDeleteUser, crudUserSystem } = require('../models/users/user');

const router = express.Router();

//rutas para los inventarios
router.post('/getInventory', authenticateToken, async (req, res) =>{
    const { idClub }  = req.body;
    try{
        const [inventory] = await getInventory(idClub);
        if(!inventory) return res.status(404).send({message:'No hay registros'});
        res.json({inventory});
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.delete('/deleteProductInventory', authenticateToken, async(req, res) => { 
    const { inventoryID, idClub } = req.body;
    try{
        const deleteProd = await deleteProductInventory(inventoryID, idClub);
        if(!deleteProd) return res.status(404).send({message:'Error al eliminar el producto'});
        res.json({message: 'Producto eliminado del inventario con éxito.'})
    } catch (error) {
        console.error(error)
        res.status(500).json( {error: 'ServerError', message: 'Error en el servidor'});
    }
});

router.post('/addOrUpdateInventory', authenticateToken, async(req, res) => {
    const { cantProductos, productID, idClub, fecha } = req.body;
    try{
        const add = await addOrUpdateInventory(cantProductos, productID, idClub, fecha);
        if(!add) return res.status(404).send({message:'Error al registrar u editar los productos en el inventario'});
        res.json({add})
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor'});
    }
});

//ruta para cargar datos de clientes/staff
router.post('/viewDataClientsOrStaff', authenticateToken, async (req, res) => {
    const { idClub, typeAction } = req.body;

    try {
        const data = await viewDataClientsOrStaff(idClub, typeAction);
        if (!data) {
            return res.status(404).json({ message: 'No se encontraron datos' });
        }
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

//rutas para obtener los clubes y cant de usuarios activos
router.get('/getClubesData', authenticateToken, async (req, res) => {
    try {
        const data = await getClubesData();
        if(!data) return res.json({ message: 'No se encontraron datos.'}) 
        return res.json({ data });
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

//metodo para todos los procesos de los clubes
router.post('/crudClub', authenticateToken, async(req, res) => {
    const { idClub, nameClub, addressClub, dataIFrame, typeAction } = req.body;
    try { 
        if(typeAction != 2){
            const [data] = await crudClub(idClub, nameClub, addressClub, dataIFrame, typeAction);
            if(!data) return res.json({message: 'Ocurrió un error al registrar el club'});
            return res.json( data );
        } else {
            const data = await crudClub(idClub, nameClub, addressClub, dataIFrame, typeAction);
            if(!data) return res.json({message: 'Ocurrió un error al registrar el club'});
            return res.json( {data} );
        }
        
       
    } catch ( error ) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})
//rutas para gestion de usuarios
router.post('/newUserOrStaff', authenticateToken, async (req, res) => {
    const { username, lastname, phone, email, nameEmergency, phoneEmergency, idUserType, idClub, fecha} = req.body;

    try{
        const [response] = await newUserOrStaff(username, lastname, phone, email, nameEmergency, phoneEmergency, idUserType, idClub, fecha);
        if(!response) res.status(404).send({message:'Error al registrar al usuario'});
        return res.json( response );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
}) 

router.post('/modifyOrDeleteUser', authenticateToken, async(req, res) => {
    const { idUser, username, lastname, phone, email, nameContact, phoneContact, valueOption} = req.body;

    try {
        const [data] = await modifyOrDeleteUser(idUser, username, lastname, phone, email, nameContact, phoneContact, valueOption);
        if(!data) res.status(404).send({message:'Ocurrió un error al realizar la solicitud'});
        return res.json( data );
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'ServerError', message: 'Error en el servidor'});
    }
});

//metodo para todos los procesos de usuarios del sistema
router.post('/crudUserSystem', authenticateToken, async(req, res) => {
    const { adminID, username,  password, idUserType, typeAction } = req.body;

    try {
        if(typeAction != 2){
            const [data] = await crudUserSystem(adminID, username,  password, idUserType, typeAction);
            if(!data) res.status(404).send({message:'Ocurrió un error al procesar la solicitud.'});
            return res.json( data );
        } else {
            const data = await crudUserSystem(adminID, username,  password, idUserType, typeAction);
            if(!data) res.status(404).send({message:'Ocurrió un error al obtener los datos'});
            return res.json( { data } );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'ServerError', message: 'Error en el servidor'});
    }
})



module.exports = router;
