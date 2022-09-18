new Vue({
    el: '#app',
    data:{
        start: false,
        playerLife: 100,
        monsterLife: 100,
        playerWins: false,
        monsterWins: false,
        logs: []
    },
    methods: {
        playerAttackHeal(pminDamage, pmaxDamage, heal){
            const  minDamage = Math.ceil(pminDamage);
            const maxDamage = Math.floor(pmaxDamage);
            const factor = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage)

            if(!heal) {
                this.monsterLife <= 100 && (
                    this.monsterLife = this.monsterLife - factor,
                    this.logs.unshift({type: 'player', msg: `JOGADOR ATINGIU MONSTRO COM ${factor}`})
                )
            } else {
                this.playerLife <= 100 && (
                    this.playerLife = this.playerLife + factor,
                    this.logs.unshift({type: 'player', msg: `JOGADOR CUROU-SE COM ${factor}`})
                )
            }

            this.monsterLife <= 0 ? this.monsterLife = 0 : ''
            this.playerLife > 100 ? this.playerLife = 100 : ''
            // console.log(`factor: ${factor} | playerLife: ${this.playerLife} | min:${minDamage} max:${maxDamage} `)
        },
        monsterAttack(pminDamage, pmaxDamage){
            const  minDamage = Math.ceil(pminDamage);
            const maxDamage = Math.floor(pmaxDamage);
            const factor = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage)

            this.playerLife <= 100 && (
                this.playerLife = this.playerLife - factor,
                this.logs.unshift({type: 'monster', msg: `MONSTRO ATINGIU JOGADOR COM ${factor}`})
            )

            this.playerLife <= 0 ? this.playerLife = 0 : ''

        },
        handleAttack(){
            this.monsterAttack(5,9)
            this.playerAttackHeal(3,6, false)
            this.gameOver
        },
        handleSpecialAttack(){
            this.monsterAttack(5,9)
            this.playerAttackHeal(7,12, false)
            this.gameOver
        },
        handleHeal(){
            this.monsterAttack(4,8)
            this.playerAttackHeal(6,9, true)
            this.gameOver
        },
        handleGiveup(){
            this.start = false
            this.restartLives()
        },
        restartLives(){
            // console.log('restarting lives....'),
            this.logs = []
        },
        startGame(){
            this.start = !this.start,
            this.playerLife = 100,
            this.monsterLife = 100,
            this.playerWins = false
            this.monsterWins = false
        },
    },
    computed: {
        gameOver(){
            if(this.monsterLife < 1) {
                this.playerWins = true
                this.start = false
                this.restartLives()
            } else if (this.playerLife < 1) {
                this.monsterWins = true
                this.start = false
                this.restartLives()
            }
        },
    },
})