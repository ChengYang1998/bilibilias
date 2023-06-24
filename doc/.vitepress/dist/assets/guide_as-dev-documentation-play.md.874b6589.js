import{_ as s,o as a,c as n,O as l}from"./chunks/framework.95b9d657.js";const F=JSON.parse('{"title":"内置播放器","description":"","frontmatter":{},"headers":[],"relativePath":"guide/as-dev-documentation-play.md","filePath":"guide/as-dev-documentation-play.md"}'),p={name:"guide/as-dev-documentation-play.md"},o=l(`<h1 id="内置播放器" tabindex="-1">内置播放器 <a class="header-anchor" href="#内置播放器" aria-label="Permalink to &quot;内置播放器&quot;">​</a></h1><p>BILIBILIAS内部播放器采用了<a href="https://github.com/Jzvd/JZVideo" target="_blank" rel="noreferrer">饺子播放器</a>,显然这一个播放器并不能满足我们的需求，因为我们有弹幕需要播放，因此又在此基础上添加了<a href="https://github.com/bilibili/DanmakuFlameMaster" target="_blank" rel="noreferrer">烈焰弹幕使</a>， 下面将阐述下现在BILIBILIAS的播放器<a href="https://github.com/1250422131/bilibilias/blob/45a18de2d405a04e62952957e489a39852e4272c/common/src/main/java/com/imcys/bilibilias/common/base/view/AsJzvdStd.kt" target="_blank" rel="noreferrer">AsJzvdStd</a></p><p>需要注意的是<a href="https://github.com/1250422131/bilibilias/blob/45a18de2d405a04e62952957e489a39852e4272c/common/src/main/java/com/imcys/bilibilias/common/base/view/AsJzvdStd.kt" target="_blank" rel="noreferrer">AsJzvdStd</a>中提供了一些基础性的功能，各个模块应当制定属于自己的的播放器，比如<a href="https://github.com/1250422131/bilibilias/blob/45a18de2d405a04e62952957e489a39852e4272c/app/src/main/java/com/imcys/bilibilias/base/view/AppAsJzvdStd.kt" target="_blank" rel="noreferrer">AppAsJzvdStd</a>，这个AppAsJzvdStd我们随后会讲到。</p><h2 id="功能概览" tabindex="-1">功能概览 <a class="header-anchor" href="#功能概览" aria-label="Permalink to &quot;功能概览&quot;">​</a></h2><h3 id="拓展功能" tabindex="-1">拓展功能 <a class="header-anchor" href="#拓展功能" aria-label="Permalink to &quot;拓展功能&quot;">​</a></h3><p>我们拓展了一些简单的功能在饺子播放器的基础之上。</p><ul><li>支持弹幕开启和关闭</li><li>视频滚动弹幕也跟随跳转</li><li>自定义视频加载海报</li><li>更新视频封面</li><li>下载视频封面</li><li>横竖屏视频不同全屏模式</li></ul><h2 id="拓展方法" tabindex="-1">拓展方法 <a class="header-anchor" href="#拓展方法" aria-label="Permalink to &quot;拓展方法&quot;">​</a></h2><h3 id="扩展接口" tabindex="-1">扩展接口 <a class="header-anchor" href="#扩展接口" aria-label="Permalink to &quot;扩展接口&quot;">​</a></h3><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">JzbdStdInfo</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">//视频开始播放（视频已经在播放了，暂停播放也会换起）</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">statePlaying</span><span style="color:#A6ACCD;">(state: </span><span style="color:#FFCB6B;">Int</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">//视频暂停播放</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">stopPlay</span><span style="color:#A6ACCD;">(state: </span><span style="color:#FFCB6B;">Int</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">//视频播放结束</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">endPlay</span><span style="color:#A6ACCD;">(state: </span><span style="color:#FFCB6B;">Int</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">//视频进度被拖动</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">seekBarStopTracking</span><span style="color:#A6ACCD;">(state: </span><span style="color:#FFCB6B;">Int</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>这些接口是扩展自饺子播放器的，因为饺子播放器有部分接口并未暴露，需要我们继承后进行处理，因此BILIBILIAS新增了一组接口，用来填补这部分空缺。</p><p>利用这些接口，你可以做许多事情。</p><h3 id="更新视频封面" tabindex="-1">更新视频封面 <a class="header-anchor" href="#更新视频封面" aria-label="Permalink to &quot;更新视频封面&quot;">​</a></h3><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">updatePoster</span><span style="color:#A6ACCD;">(url: </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        posterImageUrl </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> url</span></span>
<span class="line"><span style="color:#A6ACCD;">        Glide.</span><span style="color:#82AAFF;">with</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">this</span><span style="color:#A6ACCD;">.context)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .</span><span style="color:#82AAFF;">load</span><span style="color:#A6ACCD;">(url)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .</span><span style="color:#82AAFF;">into</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">this</span><span style="color:#A6ACCD;">.posterImageView)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>通过调用该方法可以更新当前视频未播放时的海报</p><h3 id="改变竖屏视频全屏方案" tabindex="-1">改变竖屏视频全屏方案 <a class="header-anchor" href="#改变竖屏视频全屏方案" aria-label="Permalink to &quot;改变竖屏视频全屏方案&quot;">​</a></h3><p>我们覆写了饺子播放器中的<code>gotoFullscreen()</code>方法，在该方法中加了一则判断。</p><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">override</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">gotoFullscreen</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//...............</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">//通过判断宽高来确定是不是横向视频</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#82AAFF;">isHorizontalAsVideo</span><span style="color:#A6ACCD;">()) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            JZUtils.</span><span style="color:#82AAFF;">setRequestedOrientation</span><span style="color:#A6ACCD;">(jzvdContext, FULLSCREEN_ORIENTATION)</span></span>
<span class="line"><span style="color:#A6ACCD;">        } </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">            JZUtils.</span><span style="color:#82AAFF;">setRequestedOrientation</span><span style="color:#A6ACCD;">(jzvdContext, NORMAL_ORIENTATION)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;">//...............</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isHorizontalAsVideo</span><span style="color:#A6ACCD;">(): </span><span style="color:#FFCB6B;">Boolean</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> width &gt; height</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>通过该方法判断横竖屏之后改变全屏方案，这样就能让竖屏视频也有很好的全屏模式了。</p><h3 id="下载视频封面" tabindex="-1">下载视频封面 <a class="header-anchor" href="#下载视频封面" aria-label="Permalink to &quot;下载视频封面&quot;">​</a></h3><p>我们封装了一个简单下载封面图片的方法<code>clickPicDownload()</code></p><p>代码如下，假如你想在这里做动作，那么就可以考虑在这块修改</p><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">clickPicDownload</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (posterImageUrl </span><span style="color:#89DDFF;">!=</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">&quot;&quot;</span><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#82AAFF;">downloadPic</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>在页面<code>onClick</code>方法中我们会判断是否点击了<code>as_jzvdstd_pic_dl_bt</code>按钮，假如被点击了那么就执行<code>clickPicDownload()</code>，当然在下载后我们会通知相册更新这张图片，以便系统发现它。</p><h2 id="databinding支持" tabindex="-1">DataBinding支持 <a class="header-anchor" href="#databinding支持" aria-label="Permalink to &quot;DataBinding支持&quot;">​</a></h2><p>尽管我们没有对AsJzvdStd进行databinding迁移，但是我们仍然提供了一个adapter，帮我们简化一些数据绑定流程。</p><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">com.imcys.bilibilias.base.view.AppAsJzvdStd</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">android</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">transitionName</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">videoPic</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">android</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@+id/as_video_asJzvdStd</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">android</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">layout_width</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">match_parent</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">android</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">layout_height</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">match_parent</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">android</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">imageUrl</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@{VideoBaseBean.data.pic}</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">app</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">layout_collapseMode</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">parallax</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">app</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">showPlayButton</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">false</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><p>如你所见，接受一个imageUrl属性，这并不是普通的自定义属性，而这个属性是被databinding处理的。</p><p>如果你使用过databinding就明白，使用<strong>BindingAdapter</strong>这个注解，可以为组件添加一个自定义属性，<a href="https://github.com/1250422131/bilibilias/blob/45a18de2d405a04e62952957e489a39852e4272c/common/src/main/java/com/imcys/bilibilias/common/base/adapter/AsJzvdStdAdapter.java" target="_blank" rel="noreferrer">AsJzvdStdAdapter</a>就是这样诞生的。</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">AsJzvdStdAdapter</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">BindingAdapter</span><span style="color:#89DDFF;">({</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">android:imageUrl</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">loadImage</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">AsJzvdStd</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">asJzvdStd</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">url</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        asJzvdStd</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setPosterImageUrl</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        Glide</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">with</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">asJzvdStd</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getContext</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">url</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">into</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">asJzvdStd</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">posterImageView</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>是一段比较常规的代码，我们利用setPosterImageUrl的方法设置了posterImageUrl这个属性，并且为<code>posterImageView</code>设置了图片。</p><h2 id="appasjzvdstd" tabindex="-1">AppAsJzvdStd <a class="header-anchor" href="#appasjzvdstd" aria-label="Permalink to &quot;AppAsJzvdStd&quot;">​</a></h2><p><a href="https://github.com/1250422131/bilibilias/blob/45a18de2d405a04e62952957e489a39852e4272c/app/src/main/java/com/imcys/bilibilias/base/view/AppAsJzvdStd.kt" target="_blank" rel="noreferrer">AppAsJzvdStd</a>它可以说是进一步定制的饺子播放器，它继承自AsJzvdStd，App代表它服务于APP模块。</p><h3 id="拓展能力" tabindex="-1">拓展能力 <a class="header-anchor" href="#拓展能力" aria-label="Permalink to &quot;拓展能力&quot;">​</a></h3><ul><li>支持显示/关闭弹幕按钮</li><li>新增视频加载等待动画</li><li>修改原本的视频播放器图标样式</li></ul><h3 id="布局改动" tabindex="-1">布局改动 <a class="header-anchor" href="#布局改动" aria-label="Permalink to &quot;布局改动&quot;">​</a></h3><p><strong>AppAsJzvdStd</strong>重点强调了一些用户体验，因此我们正在布局上也有一些调整，改变后的布局为<code>app_as_jz_layout_std</code>。</p><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">override</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getLayoutId</span><span style="color:#A6ACCD;">(): </span><span style="color:#FFCB6B;">Int</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> R.layout.app_as_jz_layout_std</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><p>当然这是有代价的，我们改变了组件id，这会导致原本的饺子播放器有一部分ID无法找到，无法正确响应事件，因此我们需要重新对事件进行绑定。</p><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">@SuppressLint</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;Recycle&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">constructor</span><span style="color:#A6ACCD;">(context: </span><span style="color:#FFCB6B;">Context</span><span style="color:#A6ACCD;">, attrs: </span><span style="color:#FFCB6B;">AttributeSet</span><span style="color:#A6ACCD;">?) : </span><span style="color:#FFCB6B;">super</span><span style="color:#A6ACCD;">(</span><span style="color:#FFCB6B;">context</span><span style="color:#A6ACCD;">, </span><span style="color:#FFCB6B;">attrs</span><span style="color:#A6ACCD;">) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">isInEditMode) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#676E95;font-style:italic;">//弹幕按钮事件绑定</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#82AAFF;">bingAppAsJzStdDanmakuButtonEvent</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#676E95;font-style:italic;">//绑定播放按钮事件</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#82AAFF;">bindingAppAsJzStdPlayButtonEvent</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><h3 id="弹幕显示-隐藏切换" tabindex="-1">弹幕显示/隐藏切换 <a class="header-anchor" href="#弹幕显示-隐藏切换" aria-label="Permalink to &quot;弹幕显示/隐藏切换&quot;">​</a></h3><p>这里的话我们不仅仅需要改变弹幕状态，而且需要记住这个状态。并且，假如上一次是已经关闭了弹幕，那么这一次就不再展示弹幕，除非用户手动开启。</p><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">bingAppAsJzStdDanmakuButtonEvent</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">val</span><span style="color:#A6ACCD;"> sharedPreferences </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> PreferenceManager.</span><span style="color:#82AAFF;">getDefaultSharedPreferences</span><span style="color:#A6ACCD;">(context)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">val</span><span style="color:#A6ACCD;"> danmakuSwitch </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">            sharedPreferences.</span><span style="color:#82AAFF;">getBoolean</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;user_video_danmaku_switch&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">danmakuSwitch) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#676E95;font-style:italic;">//隐藏弹幕</span></span>
<span class="line"><span style="color:#A6ACCD;">            asDanmaku.</span><span style="color:#82AAFF;">hide</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">            appAsJzStdDanmakuButton.</span><span style="color:#82AAFF;">setImageResource</span><span style="color:#A6ACCD;">(com.imcys.bilibilias.common.R.drawable.ic_asplay_barrage_off)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        appAsJzStdDanmakuButton.</span><span style="color:#82AAFF;">setOnClickListener</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#C792EA;">val</span><span style="color:#A6ACCD;"> sharedPreferences </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> PreferenceManager.</span><span style="color:#82AAFF;">getDefaultSharedPreferences</span><span style="color:#A6ACCD;">(context)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#C792EA;">val</span><span style="color:#A6ACCD;"> danmakuSwitch </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">                sharedPreferences.</span><span style="color:#82AAFF;">getBoolean</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;user_video_danmaku_switch&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">            sharedPreferences.</span><span style="color:#82AAFF;">edit</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#82AAFF;">putBoolean</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;user_video_danmaku_switch&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">danmakuSwitch)</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#676E95;font-style:italic;">//注意，这里是变动前的标志</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> (danmakuSwitch) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                appAsJzStdDanmakuButton.</span><span style="color:#82AAFF;">setImageResource</span><span style="color:#A6ACCD;">(com.imcys.bilibilias.common.R.drawable.ic_asplay_barrage_off)</span></span>
<span class="line"><span style="color:#A6ACCD;">                asDanmaku.</span><span style="color:#82AAFF;">hide</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">            } </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">                appAsJzStdDanmakuButton.</span><span style="color:#82AAFF;">setImageResource</span><span style="color:#A6ACCD;">(com.imcys.bilibilias.common.R.drawable.ic_asplay_barrage_on)</span></span>
<span class="line"><span style="color:#A6ACCD;">                asDanmaku.</span><span style="color:#82AAFF;">show</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">SharedPreferences即将被迁移</p><p>BILIBILIAS正在逐步过渡至使用<a href="./.html">MMKV</a>，因此这里很可能在后面发送变动。</p></div><h3 id="视频播放前加载动画" tabindex="-1">视频播放前加载动画 <a class="header-anchor" href="#视频播放前加载动画" aria-label="Permalink to &quot;视频播放前加载动画&quot;">​</a></h3><p>当视频加载时会出现两个卡通人物，它们收集自网络，当加载时这个函数会被调用，我们随机一个数字，并且根据结果展示不同的gif。</p><p>如果你还有其他好看的gif或者想要调整这一内容，可以考虑在这里入手。</p><div class="language-kotlin"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">@SuppressLint</span><span style="color:#A6ACCD;">(</span><span style="color:#C3E88D;">&quot;CheckResult&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">override</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">fun</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">onStatePreparing</span><span style="color:#A6ACCD;">() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">super</span><span style="color:#A6ACCD;">.</span><span style="color:#82AAFF;">onStatePreparing</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        posterImageView.visibility </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> View.GONE</span></span>
<span class="line"><span style="color:#A6ACCD;">        asJzvdstdPosterFL.</span><span style="color:#82AAFF;">setBackgroundColor</span><span style="color:#A6ACCD;">(resources.</span><span style="color:#82AAFF;">getColor</span><span style="color:#A6ACCD;">(R.color.white))</span></span>
<span class="line"><span style="color:#A6ACCD;">        appAsJzStdLoadImage.visibility </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> View.VISIBLE</span></span>
<span class="line"><span style="color:#A6ACCD;">        Glide.</span><span style="color:#82AAFF;">with</span><span style="color:#A6ACCD;">(context).</span><span style="color:#82AAFF;">asGif</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">            .</span><span style="color:#82AAFF;">apply</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;font-style:italic;">when</span><span style="color:#A6ACCD;"> ((</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">..</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">).</span><span style="color:#82AAFF;">random</span><span style="color:#A6ACCD;">()) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">&gt; </span><span style="color:#82AAFF;">load</span><span style="color:#A6ACCD;">(com.imcys.bilibilias.common.R.drawable.ic_public_load_play_iloli_1)</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">&gt; </span><span style="color:#82AAFF;">load</span><span style="color:#A6ACCD;">(com.imcys.bilibilias.common.R.drawable.ic_public_load_play_iloli_2)</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">            .</span><span style="color:#82AAFF;">into</span><span style="color:#A6ACCD;">(appAsJzStdLoadImage)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div>`,48),e=[o];function t(c,r,A,i,C,y){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{F as __pageData,d as default};
