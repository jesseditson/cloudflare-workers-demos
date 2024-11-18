function loadFetcherModule(path: string): [string?, Error?] {
    try {
      return [require(path).default, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  }
  
  export function getRuntimeFetcher(): string {
    const [fetcher, error] = ["./a", "./b"]
      .map(path => loadFetcherModule(path))
      .reduce((agg, tuple) => {
        if (agg[0] !== undefined)
          return agg;
        return tuple;
      }, []);
  
    if (error)
      throw new Error(
        `No global \`fetch\` or \`https\` module was found. Please, provide a Fetcher implementation. Error: ${error}`,
      );
  
    return fetcher!;
  }
