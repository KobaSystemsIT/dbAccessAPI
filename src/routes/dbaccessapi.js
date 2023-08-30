const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { getInventory, deleteProductInventory, addOrUpdateInventory } = require('../models/inventory/inventory');
const { viewClientsData, viewStaffData } = require('../models/clients/clients');

const router = express.Router();

router.post('/getInventory', authenticateToken, async (req, res) =>{
    const { idClub }  = req.body;
    try{
        const inventory = await getInventory(idClub);
        if(!inventory) return res.status(404).send('No hay registros');
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
        if(!deleteProd) return res.status(404).send('Error al eliminar el producto');
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
        if(!add) return res.status(404).send('Error al registrar u editar los productos en el inventario');
        res.json({add})
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor'});
    }
});

router.post('/viewClientsData', authenticateToken, async (req, res) => {
    const { idClub } = req.body;

    try {
        const data = await viewClientsData(idClub);
        if (!data) {
            return res.status(404).json({ error: 'No se encontraron datos' });
        }
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.post('/viewStaffData', authenticateToken, async (req, res) => {
    const { idClub } = req.body;

    try {
        const data = await viewStaffData(idClub);
        if (!data) {
            return res.status(404).json({ error: 'No se encontraron datos' });
        }
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});



module.exports = router;