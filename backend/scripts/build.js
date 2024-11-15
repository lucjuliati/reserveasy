import { spawn, exec } from 'child_process'

const changeDir = spawn('cd', ['../app'], { shell: true })

function execute(action, delay) {
    return new Promise((resolve, reject) => setTimeout(() => {
        try {
            resolve(action())
        } catch (err) {
            console.error(err)
            reject(err)
        }
    }, delay * 1000))
}

changeDir.on('close', async (code) => {
    try {
        if (code != 0) throw new Error(code)

        await execute(() => {
            exec('rm -rf public/', (error, stdout, stderr) => {
                if (error || stderr) throw new Error(error)

                console.info('public/ deleted')
            })
        }, 1.5)

        spawn('yarn', ['build'], { cwd: '../app', shell: true }).on('close', async (code) => {
            console.info('\x1b[32m%s\x1b[0m', 'Vite build finished')

            await execute(() => {
                exec('mv ../app/dist/ ../backend/public/', (error, stdout, stderr) => {
                    if (error || stderr) throw new Error(error)

                    console.info('app/dist/ moved to backend/public/')
                })
            }, 1)

            await execute(() => {
                exec('cp ../app/assets/* ../backend/public/assets/', (error, stdout, stderr) => {
                    if (error || stderr) throw new Error(error)

                    console.info('app/assets/ moved to backend/public/')
                })
            }, 1)
        })
    } catch (err) {
        console.error(err)
    }
})
