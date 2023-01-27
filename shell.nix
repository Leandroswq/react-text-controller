with import (fetchTarball https://github.com/NixOS/nixpkgs/archive/22.05.tar.gz) { };

stdenv.mkDerivation {
  name = "@Leandroswq/react-text-controller";

  buildInputs = with pkgs; [
    git
    nodejs
    yarn
  ];
}
