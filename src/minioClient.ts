import * as Minio from "minio";

const minioClient = new Minio.Client ({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: "bCNKDBVU1CJz9XkDqhB0",
    secretKey: "gnrpzGimjKn3WQmxmvG5IRDpcMZZixDaXjFy9mtz"
});

export { minioClient };
