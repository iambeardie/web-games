  var unityInstanceRef;
  var unsubscribe;
  var container = document.querySelector("#unity-container");
  var canvas = document.querySelector("#unity-canvas");
  var loadingBar = document.querySelector("#unity-loading-bar");
  var progressBarFull = document.querySelector("#unity-progress-bar-full");
  var warningBanner = document.querySelector("#unity-warning");

  function unityShowBanner(msg, type) 
  {
    function updateBannerVisibility()
    {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }

    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);

    if (type == 'error')
    {
      div.style = 'background: red; padding: 10px;';
    }
    else
    {
      if (type == 'warning')
      {
        div.style = 'background: yellow; padding: 10px;';
      }

      setTimeout(function()
      {
        warningBanner.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }

    updateBannerVisibility();
  }

  var buildUrl = "Build";
  var loaderUrl = buildUrl + "/fc460f050b9608898672fdf963439945.loader.js";
  var config = {
    dataUrl: buildUrl + "/b24b8130033a01a86d957d9ae5e8bb3b.data",
    frameworkUrl: buildUrl + "/11459988f2313ea6f64d99a3fdcdade1.framework.js",
    codeUrl: buildUrl + "/83fbf90ac6842a18e6698f2a7a4687c3.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "BrainSoft Apps",
    productName: "Moto Bike Race",
    productVersion: "1.0.76",
    showBanner: unityShowBanner,
  };

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';

    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  canvas.style.background = "url('" + buildUrl + "/5bddaa172b14812a884de6a870460a3f.jpg') center / cover";
  loadingBar.style.display = "block";

  var script = document.createElement("script");
  script.src = loaderUrl;

  script.onload = () => 
  {
    createUnityInstance(canvas, config, (progress) => 
    {
      progressBarFull.style.width = 100 * progress + "%";
    }
    ).then((unityInstance) => 
    {
      unityInstanceRef = unityInstance;
      
      loadingBar.style.display = "none";
    }
    ).catch((message) => 
    {
      alert(message);
    });
  };

  document.body.appendChild(script);
