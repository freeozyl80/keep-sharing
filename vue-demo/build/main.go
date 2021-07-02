package main

import "github.com/evanw/esbuild/pkg/api"
import "os"
import "path/filepath"
import "fmt"

func main() {
  fmt.Println("构建开始")

  dir, _ := os.Getwd()
  entryFile := filepath.Join(dir, "..", "main.ts")
  tsConfig := filepath.Join(dir, "..", "tsConfig.json")
  serverDir := filepath.Join(dir, "..", "..", "public")

  fmt.Println(filepath.Join(serverDir, "vueApps", "app.js"))
  result := api.Build(api.BuildOptions{
    EntryPoints: []string{entryFile},
    Bundle:      true,
    Tsconfig:    tsConfig,
    Outfile:     filepath.Join(serverDir, "vueApps", "app.js"),
  })

  if len(result.Errors) > 0 {
    os.Exit(1)
  }
}