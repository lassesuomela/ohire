<script>
export default {
    mounted () {
        localStorage.removeItem("token");
        this.$router.push('/login');
    }
}
</script>

<style>

</style>