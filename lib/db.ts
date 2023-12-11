import mysql from "mysql2/promise";

interface Props {
    query: any
    values: Array<any>
}

export async function query(props: Props) {
    const dbconnection = await mysql.createConnection({
        host: 'localhost',
        database: 'training',
        user: 'root',
        password: '',
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
