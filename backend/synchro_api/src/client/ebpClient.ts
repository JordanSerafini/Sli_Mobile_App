import sql from 'mssql';

const config: sql.config = {
    server: "SRVEBP-2022\\SRVEBP",
    database: "Solution Logique_0895452f-b7c1-4c00-a316-c6a6d0ea4bf4",
    authentication: {
        type: "default",
        options: {
            userName: "sa",
            password: "@ebp78EBP",
        },
    },
    options: {
        trustServerCertificate: true,
        encrypt: true, 
    },
};

class DatabaseClient {
    private pool: sql.ConnectionPool | undefined;

    constructor() {
        this.pool = undefined;
    }

    async connect(): Promise<void> {
        if (!this.pool) {
            try {
                this.pool = await sql.connect(config);
                console.log("Connection to the database established successfully!");
            } catch (error) {
                console.error("Error connecting to the database:", error);
                throw error;
            }
        }
    }

    async query(query: string, params?: { [name: string]: any }): Promise<sql.IResult<any>> {
        if (!this.pool) {
            await this.connect(); // Make sure the pool is connected
        }
        const request = new sql.Request();

        if (params) {
            Object.keys(params).forEach(key => {
                request.input(key, params[key]);
            });
        }

        try {
            const result: sql.IResult<any> = await request.query(query);
            return result;
        } catch (error) {
            console.error("Error executing query:", error);
            throw error; // Rethrowing the error is important to handle it in the calling function
        }
    }
}

const EBPclient = new DatabaseClient();
export default EBPclient;
