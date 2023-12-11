import mysql from "mysql2/promise";
interface Props {
    query: any
    values: Array<any>
}

export async function query(props: Props) {
    const dbconnection = await mysql.createConnection({
        host: process.env.DATABASE_Host,
        database: process.env.Database,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        // Si probleme connexion add socket ca viens peut etre de la 
    });

    try {
        const [results] = await dbconnection.execute(props.query, props.values)
        
        dbconnection.end()
        
        return results
    } catch (error: any) {
        console.log(error)
        throw Error(error.message);
    }
}