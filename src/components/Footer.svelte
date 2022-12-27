<script>
	const year = () => {
		var d = new Date();
		var y = d.getFullYear();
		return y;
  }
  const scrollToTop = () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
</script>


<footer>
    <div class="container">
        <div>
            <ul>
                <li><a rel="noopener noreferrer" target="_blank" href="www.google.com">Little Red Book</a></li>
                <li><a rel="noopener noreferrer" target="_blank" href="www.google.com">The Gram Y'all</a></li>
            </ul>
            <div>{year()} is my fav year!</div>
            <div>Email</div>
        </div>
            <div class="section button-container footer-section">
                <button class="back-to-top" on:click={scrollToTop}>Back to Top</button>
            </div>
    </div>
</footer>

<style>	
    footer {
        background-color: var(--mango-green);
    }
    .container {
        display: flex;
        justify-content: space-between;
        max-width: min(100vw, 1100px);
		margin: auto;
		left: 0;
		right: 0;
        padding: 16px;
    }
    ul {
        list-style: none;
        padding: 0px;
    }
    li {
        margin-bottom: 6px;
    }
</style>