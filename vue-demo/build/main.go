package main

import "github.com/evanw/esbuild/pkg/api"
import "os"
import "path/filepath"
import "fmt"

func main() {
  fmt.Println("构建启动 ～")

  dir, _ := os.Getwd()
  entryFile := filepath.Join(dir, "..", "main.ts")
  tsConfig := filepath.Join(dir, "..", "tsConfig.json")
  serverDir := filepath.Join(dir, "..", "..", "public")

  server, err := api.Serve(api.ServeOptions{
    Servedir: serverDir,
    Port: 8088,
  }, api.BuildOptions{
    EntryPoints: []string{entryFile},
    Bundle:      true,
    Tsconfig:    tsConfig,
    Outfile:     filepath.Join(serverDir, "vueApps", "app.js"),
  })
  server.Wait()

  if err != nil {
    fmt.Println("报错")
    fmt.Println(err)
    server.Stop()
  }
}