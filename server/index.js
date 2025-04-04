// ----------Import Required Module-------------//
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const bodyparser = require('body-parser')
const helmet = require('helmet')
const hpp = require('hpp')
const cookieParser = require('cookie-parser');
const mongosanitize = require('express-mongo-sanitize')
const path = require('path')
// ----------Import Required Module END-------------//
// ----------------IMPORT ROUTES--------------//
const authRoutes = require('./ROUTES/auth_Routes')
const groupRoutes = require('./ROUTES/group_Routes')
const expenseRoutes = require('./ROUTES/expenseRoutes')
const user_Routes  =  require('./ROUTES/user_Routes')

// ----------------END ROUTES--------------//

//----------------- END Global error handler-------------//
// ----------------APP USAGE--------------//
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://192.168.100.204:3000",
    credentials: true 
}))
app.use(bodyparser.json({ limit: '50mb', extended:true }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true  , parameterLimit:50000}));
app.use(express.static('./public'))
app.use("/profile", express.static('./profile'));
app.use(morgan('dev'));
app.use(helmet({crossOriginResourcePolicy:false}));
app.use(mongosanitize())
app.use(hpp());
// ----------------APP USAGE END--------------//

// ----------------API CALL AREA---------------//
app.use('/api/flat/user', authRoutes);
app.use('/api/flat/group', groupRoutes)
app.use('/api/flat/expense', expenseRoutes)
app.use('/api/flat/userDeatils', user_Routes)
// ----------------API CALL AREA END---------------//

//----------------- Global error handler-------------//
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.status || 500).json({
        status: 'fail',
        message: err.message || 'Internal Server Error',
    });
});
//-----------------END Global error handler-------------//

// ----------------Export APP TO SERVER.JS----------------//
module.exports = app;
