const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { crudInventory } = require('../models/inventory/inventory');
const { viewDataClientsOrStaff } = require('../models/clients/clients');
const { getClubesData, crudClub } = require('../models/clubes/club');
const { newUserOrStaff, modifyOrDeleteUser, crudUserSystem, getDataUser } = require('../models/users/user');
const { crudProducts, crudCategoriesProducts } = require('../models/products/products');
const { crudSubscription, newOrUpdateSubscription } = require('../models/subscription/subscription');

const router = express.Router();

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
        if (!data) return res.json({ message: 'No se encontraron datos.' })
        return res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

//rutas para gestion de usuarios
router.post('/newUserOrStaff', authenticateToken, async (req, res) => {
    const { username, lastname, phone, email, nameEmergency, phoneEmergency, idUserType, idClub, fecha } = req.body;

    try {
        const [response] = await newUserOrStaff(username, lastname, phone, email, nameEmergency, phoneEmergency, idUserType, idClub, fecha);
        if (!response) res.status(404).send({ message: 'Error al registrar al usuario' });
        return res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})

router.post('/modifyOrDeleteUser', authenticateToken, async (req, res) => {
    const { idUser, username, lastName, phoneNumber, email, nameEmergencyContact, emergencyContact, valueOption } = req.body;

    try {
        const [response] = await modifyOrDeleteUser(idUser, username, lastName, phoneNumber, email, nameEmergencyContact, emergencyContact, valueOption);
        if (!response) res.status(404).send({ message: 'Ocurrió un error al realizar la solicitud' });
        return res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

//metodo para todos los procesos de usuarios del sistema
router.post('/crudUserSystem', authenticateToken, async (req, res) => {
    const { adminID, username, password, idUserType, typeAction } = req.body;

    try {
        if (typeAction === 2) {
            const [data] = await crudUserSystem(adminID, username, password, idUserType, typeAction);
            if (!data) res.status(404).send({ message: 'Ocurrió un error al obtener los datos' });
            return res.json({ data });
        } else {
            const [data] = await crudUserSystem(adminID, username, password, idUserType, typeAction);
            if (!data) res.status(404).send({ message: 'Ocurrió un error al procesar la solicitud.' });
            return res.json(data);
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

//metodo para todos los procesos de los clubes
router.post('/crudClub', authenticateToken, async (req, res) => {
    const { idClub, nameClub, addressClub, dataIFrame, typeAction } = req.body;
    try {
        if (typeAction === 2) {
            const [data] = await crudClub(idClub, nameClub, addressClub, dataIFrame, typeAction);
            if (!data) return res.json({ message: 'Ocurrió un error al registrar el club' });
            return res.json({ data });

        } else {
            const [data] = await crudClub(idClub, nameClub, addressClub, dataIFrame, typeAction);
            if (!data) return res.json({ message: 'Ocurrió un error al registrar el club' });
            return res.json(data);
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.post('/crudProducts', authenticateToken, async (req, res) => {
    const { productID, productName, productPrice, idCategory, typeAction } = req.body;

    try {
        if (typeAction === 2) {
            const [data] = await crudProducts(productID, productName, productPrice, idCategory, typeAction);
            if (!data) return res.json({ message: 'Ocurrió un error al procesar la solicitud' });
            return res.json({data});
        } else {
            const [data] = await crudProducts(productID, productName, productPrice, idCategory, typeAction);
            if (!data) return res.json({ message: 'Ocurrió un error al procesar la solicitud' });
            return res.json( data );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.post('/crudInventory', authenticateToken, async (req, res) => {
    const { inventoryID, currentStock, productID, idClub, typeAction } = req.body;
    const timeZone = 'America/Mexico_City';

    const options = {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Formato de 24 horas
    };

    const currentDate = new Date();
    const formattedDate = new Date(currentDate.toLocaleString('en-US', options));

    const dateReorder = formattedDate;
    try { 
        if(typeAction === 2){
            const [data] = await crudInventory(inventoryID, currentStock, dateReorder, productID, idClub, typeAction);
            if(!data) return res.json({ message: 'Ocurrió un error al obtener los datos.'});
            return res.json( {data});
        } else {
            const [data] = await crudInventory(inventoryID, currentStock, dateReorder, productID, idClub, typeAction);
            return res.json(data);
        }
    } catch ( error ){ 
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.post('/getDataUser', authenticateToken, async (req, res) => {
    const { idUser } = req.body;

    try {
        const [userData] = await getDataUser(idUser);
        if(!userData) return res.json({ message: 'Ocurrió un error al obtener los datos.'});
        return res.json( {userData});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.post('/crudCategoriesProducts', authenticateToken, async (req, res) => {
    const { productCategoryID, nameCategory, typeAction } = req.body;

    try {
        const [data] = await crudCategoriesProducts(productCategoryID, nameCategory, typeAction);
        if(!data) return res.json({message: 'Ocurrió un error al procesar la solicitud'});
        if(typeAction === 2) {
            return res.json({data});
        } else {
            return res.json(data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})

router.post('/crudSubscription', authenticateToken, async (req, res) => {
    const { idSub, nameSubscription, daysSubscription, priceSubscription, typeAction } = req.body; 

    try {   
        const [data] = await crudSubscription(idSub, nameSubscription, daysSubscription, priceSubscription, typeAction);
        if(!data) return res.json({message: 'Ocurrió un error al procesar la solicitud.'});
        if(typeAction === 2){
            return res.json({data});
        } else {
            return res.json(data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.post('/newOrUpdateSubscription', authenticateToken, async (req, res) => {
    const { idUser, idSubscriptionType, idClub, startDate, endDate } = req.body;

    try {
        const [data] = await newOrUpdateSubscription(idUser, idSubscriptionType, idClub, startDate, endDate);
        if(!data) return res.json({message: 'Ocurrió un error al procesar la solicitud.'});
        return res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})



module.exports = router;
